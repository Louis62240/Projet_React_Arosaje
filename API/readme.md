```pip install virtualenv

virtualenv venv

cd .\venv\Scripts\

.\activate.ps1  

cd ../..

pip install sqlite3worker, pydantic, fastapi, "uvicorn[standart]"

uvicorn main:app --reload --port 8000
```
