import json


def load_txt(file_path):

    with open(file_path, "r", encoding="utf-8") as file:

        return file.read()


def load_json(file_path):

    with open(file_path, "r", encoding="utf-8") as file:

        return json.load(file)