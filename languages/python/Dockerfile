FROM python:3.11-slim
WORKDIR /app
COPY languages/python/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY languages/python /app
EXPOSE 5001
CMD ["python", "app.py"]
