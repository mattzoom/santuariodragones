import http.server, socketserver, os, sys

class RobustHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except Exception:
            pass

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == '__main__':
    port = 8080
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = ThreadedHTTPServer(('0.0.0.0', port), RobustHTTPRequestHandler)
    print(f'Serving Santuario on port {port}...')
    sys.stdout.flush()
    server.serve_forever()
