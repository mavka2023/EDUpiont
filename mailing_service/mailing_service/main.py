from asyncio import sleep
import datetime

import asyncpg
import asyncio
import smtplib

smtp_server = smtplib.SMTP('smtp.gmail.com', 587) # TODO: When emial is created implement logic
mailserver.ehlo()
mailserver.starttls()
mailserver.ehlo()
mailserver.login('me@gmail.com', 'mypassword') #TODO: Create email and password for sending emails

async def main():
    pool = await asyncpg.create_pool(user='postgres', password='postgres',
                                     database='postgres', host='database') # TODO: Get it from config

    while True:
        async with pool.acquire() as connection:
            events = await connection.fetch("""SELECT * FROM calendar_events INNER JOIN users on users.id = calendar_events.owner_id WHERE remind_datetime < NOW() AND remind_datetime > (NOW() - INTERVAL '10 MINUTE');""")
            print(events) # TODO: Implement logic to send email
        await sleep(600)


asyncio.run(main())