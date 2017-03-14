from bs4 import BeautifulSoup as bs
import json
from pprint import pprint
from datetime import datetime

class DynamicHelper:
  def __init__(self):
    self.initiated = True

  @staticmethod
  def GetDynamicContent(mainPath):
    if mainPath == "canvas":
      # with open('static/canvas/template.html') as mainCanvas:
      #   templateSoup = bs(mainCanvas.read())
      # templateBlocks = templateSoup.find_all("template")
      
      # for block in templateBlocks:
      #   pageURL = block.get_text()
      #   with open('static/canvas/'+pageURL) as blockPage:
      #     pageSoup = bs(blockPage.read())
        
      #   block.parent.append(pageSoup.find("body"))
      #   block.parent.find("body").unwrap()
      #   block.decompose()

      #   mainHead = templateSoup.find("head")
      #   mainHead.append(pageSoup.find("head"))
      #   mainHead.find("head").unwrap()

      #data = str(templateSoup.prettify())
      data = "<html><head></head><body>This page is not real</body></html>"
      content_type = "text/html"

    else:
      with open('static/bootstrap-home.html', 'r') as myHome:
        data = myHome.read()
      content_type = "text/html"

    return data, content_type

  @staticmethod
  def GetPassBackContent(mainPath, params):
    with open("signups.json", "r") as signups:
      allSignups = json.load(signups)
    if len(allSignups) <= 0:
      allSignups = []

    params["timestamp"] = str(datetime.now())
    allSignups.append(params);
    pprint(allSignups)

    with open("signups.json", "w") as signupsWrite:
      json.dump(allSignups, signupsWrite, indent=2, sort_keys = True)

    data = '{"status":"Success"}'
    content_type = "application/json"

    return data, content_type