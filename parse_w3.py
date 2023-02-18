# import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
from bs4 import Tag
# import networkx as nx
import requests


def extend_tree(toc_ol, G):
    for toc_li in toc_ol.find_all("li", class_="tocline", recursive=False):
        print('  ' * G + toc_li.find("a").text)
        for toc_ol_sub in toc_li.find_all("ol", class_="toc", recursive=False):
            extend_tree(toc_ol_sub, G + 1)


if __name__ == '__main__':
    # Download HTML for Web Content Accessibility Guidelines (WCAG) 2.1
    resp = requests.get("https://www.w3.org/TR/WCAG21/")
    resp.raise_for_status()
    w3_content_html = resp.text
    soup = BeautifulSoup(w3_content_html, "html.parser")
    # G = nx.DiGraph()

    # parse toc, nav id "toc"
    toc_nav = soup.find(id="toc")
    assert isinstance(toc_nav, Tag)
    toc_ol = toc_nav.find("ol", class_="toc")

    # iterate through sub tables of contents, printing them as a tree

    extend_tree(toc_ol, G=0)


    # display the graph
    # nx.draw(G, with_labels=True)
    # plt.show()
