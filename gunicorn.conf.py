import multiprocessing
from os import getenv

bind = f"0.0.0.0:{getenv('PORT')}"
workers = 5
accesslog = "-"
errorlog = "-"
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s "%(a)s"'
max_requests = 1000
