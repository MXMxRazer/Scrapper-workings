from bs4 import BeautifulSoup as bs; 
import requests as req; 

request = req.get('https://www.indeed.com/jobs?q=part%20time&l=Toronto%2C%20OH&from=searchOnHP&vjk=1788ce9131900dd3').text; 
soup = bs(request, 'html.parser');
specific = soup.find_all('div', class_ = 'companyLocation'); 
anchors = soup.find_all('a', href=True); 

for anchor in anchors:
    print(anchor.contents); 