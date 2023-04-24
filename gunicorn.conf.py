import multiprocessing
from os import getenv

bind = f"0.0.0.0:{getenv('PORT')}"
workers = 5
accesslogfile = "-"
errorlogfile = "-"
loglevel = "info"
access_logf_ormat = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
max_requests = 1000
