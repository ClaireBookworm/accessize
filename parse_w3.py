from bs4 import BeautifulSoup
from bs4 import Tag
import json
import requests
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class TreeNode:
    """
    A tree node
    """

    link_name: str # textContent on the link
    link_href: str # href on the link
    section_text: str # textContent of the section
    children: List['TreeNode']
    secno: Optional[str] # section number, like 1.3
    depth: int # depth in the tree

    def __str__(self):
        return self.link_name


def create_trees(soup, toc_ol, depth=0) -> List[TreeNode]:
    nodes = []
    for toc_li in toc_ol.find_all("li", class_="tocline", recursive=False):
        children = []
        for toc_ol_sub in toc_li.find_all("ol", class_="toc", recursive=False):
            children += create_trees(soup, toc_ol_sub, depth=depth+1)

        toc_a = toc_li.find("a", class_='tocxref', recursive=False)
        secno = toc_a.find("span", class_='secno')
        # get id from href
        section_id = toc_a['href'].split('#')[1]
        section_text = soup.find(id=section_id).text
        nodes.append(TreeNode(
            link_name=toc_a.text,
            link_href=toc_a['href'],
            section_text=section_text,
            children=children,
            secno=secno.text if isinstance(secno, Tag) else None,
            depth=depth,
        ))

    return nodes


def print_tree(node: TreeNode, G=0):
    print('  ' * G + node.link_name)
    for child in node.children:
        print_tree(child, G + 1)


if __name__ == '__main__':
    # Download HTML for Web Content Accessibility Guidelines (WCAG) 2.1
    resp = requests.get("https://www.w3.org/TR/WCAG21/")
    resp.raise_for_status()
    w3_content_html = resp.text
    soup = BeautifulSoup(w3_content_html, "html.parser")

    # parse toc, nav id "toc"
    toc_nav = soup.find(id="toc")
    assert isinstance(toc_nav, Tag)
    toc_ol = toc_nav.find("ol", class_="toc")

    # iterate through sub tables of contents, printing them as a tree

    trees = create_trees(soup, toc_ol)
    obj = {"root": trees}

    with open('wcag21.json', 'w') as f:
        json.dump(obj, f, default=lambda o: o.__dict__, indent=2)
