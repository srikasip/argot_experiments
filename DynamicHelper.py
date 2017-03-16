from bs4 import BeautifulSoup as bs
import json
from pprint import pprint
from datetime import datetime
import requests

class DynamicHelper:
  def __init__(self):
    self.initiated = True

  @staticmethod
  def GetDynamicContent(mainPath):
    if mainPath == "canvas":
      data = "<html><head></head><body>This page is not real</body></html>"
      content_type = "text/html"

    else:
      with open('static/bootstrap-home.html', 'r') as myHome:
        data = myHome.read()
      content_type = "text/html"

    
    return data, content_type

  @staticmethod
  def GetPassBackContent(mainPath, params):

    params["SignupTimeStamps"] = str(datetime.now())
    params["UseCase"] = "Data Science"
    
    payload = json.dumps({'fields': params, 'typecast': True})

    url = "https://api.airtable.com/v0/appxXV1DjwHXfzuSL/ArgotSignupsTracker/"
    header = {"Authorization": "Bearer keyqXy9wVseyd2L6S", "Content-type":"application/json"}
    
    r = requests.post(url, data=payload, headers=header, params=None)

    if r.status_code == requests.codes.ok:
      print "Success!"
      data = '{"status":"Success"}'
    else:
      print "Failed"
      data = '{"status":"Failed"}'

    content_type = "application/json"
    return data, content_type