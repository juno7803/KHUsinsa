import requests
from bs4 import BeautifulSoup
import csv

URL = f"https://search.musinsa.com/ranking/best"
PRODURL = f"https://store.musinsa.com/app/goods"

def extract_musinsa(input_page,startIdx,endIdx):
    musinsa_result = requests.get(f"{URL}?&page={input_page}")
    soup = BeautifulSoup(musinsa_result.text,"html.parser")

    prods = soup.find_all("li",{"class":"li_box"})
    
    prodIdList = [] # 상품 각각의 아이디
    for prodId in prods:
        prodIdList.append(prodId["data-goods-no"])

    categoryList = [] # 상품의 카테고리 리스트 - 각 상품 페이지에 들어가야 알 수 있음 (시간 오래 걸림)
    for prodId in prodIdList[startIdx:endIdx]:
        musinsa_prod_result = requests.get(f"{PRODURL}/{prodId}")
        prod_soup = BeautifulSoup(musinsa_prod_result.text,"html.parser")
        category = prod_soup.find("p",{"class":"item_categories"}).find("a").string
        categoryList.append(category)

    prod_img = soup.find_all("div",{"class":"list_img"})
    prod_brand = soup.find_all("p",{"class":"item_title"})
    prod_name = soup.find_all("p",{"class":"list_info"})
    prod_price = soup.find_all("p",{"class":"price"},)

    nameList = [] # 상품 이름
    brandList = [] # 브랜드 명
    imgList = [] # 이미지 리스트
    priceList = [] # 가격 리스트

    for name in prod_name:
        nameList.append(name.find("a")["title"])
    
    for brand in prod_brand:
        brandList.append(brand.find("a").string)
    
    for img in prod_img:
        imgList.append(img.find("img")["data-original"])

    for price in prod_price:
        if price.find("del")is not None: # 할인 하는 상품
            priceList.append(int(price.find("del").string[0:-1].replace(",",""))) 
            # 200,000원 에서 "," 를 "" 으로 바꾸고, [0:-1]로 "원"을 자른 뒤 int로 형 변환
        else: # 할인 안하는 상품
            priceList.append(int(price.string.strip()[0:-1].replace(",","")))
            

    nameList = nameList[startIdx:endIdx]
    brandList = brandList[startIdx:endIdx]
    imgList = imgList[startIdx:endIdx]
    priceList = priceList[startIdx:endIdx]

    cloths=[] # 내가 원하는 최종 결과
    for i in range(endIdx-startIdx):
        cloths.append({
            'name' : nameList[i],
            'brand' : brandList[i],
            'category' : categoryList[i],
            'price' : priceList[i],
            'image' : imgList[i]
        })
    print(cloths)

# csv 파일로 저장하는 코드
    file = open("./khusinsa.csv", mode="w")
    writer = csv.writer(file)
    writer.writerow(["name","brand","category","price","image"])
    for cloth in cloths:
        writer.writerow(list(cloth.values()))
    print("csv 파일 생성이 완료되었습니다.")

while(True):
    print("크롤링 하고 싶은 페이지를 입력 해 주세요(1~100) : ")
    input_page = int(input())
    print("크롤링 하고 싶은 시작 순위와 끝 순위를 입력 해 주세요(1~90) : ")
    startIdx, endIdx = map(int,input().split())
    if(input_page < 1 or input_page > 100):
        print("잘못된 입력입니다. 다시 입력 해 주세요.")
        continue
    else:
        extract_musinsa(input_page,startIdx-1,endIdx)
        print("크롤링을 마쳤습니다! 크롤러를 종료합니다.")
        break