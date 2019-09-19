#!/usr/bin/env bash
#cd src/main/python
#export PIPENV_IGNORE_VIRTUALENVS=1
rm ./dist/input_pipe
pipenv run pyinstaller -s  -n uae_exporter --onefile --distpath ./dist/ uae_exporter.py
pipenv run pyinstaller -s  -n vice_expander --onefile --distpath ./dist/ vice_expander.py
pipenv run pyinstaller -s  -n steam_runner --onefile --distpath ./dist/ steam_runner.py
pip freeze > requirements.txt