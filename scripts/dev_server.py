#!/usr/bin/env python3
"""
Static file server for local development, with caching turned off.

`python3 -m http.server` sends no Cache-Control, so browsers cache heuristically
off Last-Modified. That is fine for a page you only read, and actively harmful
here: edits to js/*.js and css/style.css kept appearing to have no effect, in a
fresh tab and after a reload, because the HTTP cache is shared across tabs. It
looked exactly like a bug in the code. Three separate times.

This is the same server with `Cache-Control: no-store` on every response.

Usage:  python3 scripts/dev_server.py [port]
Serves the current working directory. Nothing here ships.
"""

import socket
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Keep 404s (missing assets are meaningful here) and drop the 200 noise.
        if args and str(args[1]).startswith(("4", "5")):
            super().log_message(fmt, *args)


class DualStackServer(ThreadingHTTPServer):
    """Listen on ::1 and 127.0.0.1 both.

    `localhost` resolves to ::1 first on macOS, so an IPv4-only bind makes
    http://localhost:PORT unreachable while http://127.0.0.1:PORT works -- which
    is a confusing way to spend ten minutes. Loopback only; not exposed.
    """
    address_family = socket.AF_INET6

    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8961
    DualStackServer(("::1", port), partial(NoCacheHandler)).serve_forever()
