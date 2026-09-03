#!/usr/bin/env python3
"""Sirve el panel en http://localhost:8000 (recarga los JSON en cada refresco).

Uso:  python3 tools/servir.py [puerto]
"""
import functools
import http.server
import os
import socketserver
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    handler = functools.partial(Handler, directory=RAIZ)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", puerto), handler) as httpd:
        print(f"Projets Dashboard en http://localhost:{puerto}/  (Ctrl+C para parar)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nParado.")


if __name__ == "__main__":
    main()
