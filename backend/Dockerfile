FROM ubuntu
RUN apt update
RUN apt install -y python3-pip libpq-dev python3-dev
RUN pip3 install django djangorestframework djangorestframework-simplejwt djoser psycopg2-binary psycopg2 django-cors-headers tzdata
COPY manage.py /
COPY start.sh /
COPY tfg_app /tfg_app
COPY user_accounts /user_accounts
CMD /start.sh