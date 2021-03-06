# Moodtracker

Track your mood or other habits on a daily basis.

Configure your everyday form that it its your need. 

Track...

* ... your mood
* ... time and time deltas
* ... short texts
* ... long texts
* ... boolean values
* ... numbers
* ... check-lists

![alt text](https://github.com/sebastianrzk/moodtracker/blob/master/docs/overview.png?raw=true)
![alt text](https://github.com/sebastianrzk/moodtracker/blob/master/docs/edit.png?raw=true)

## How to run

### Use existing docker images

Modify the `docker-compose.yml` to use this prebuilt images:

* [sebastianrzk/moodtracker-frontend](https://registry.hub.docker.com/r/sebastianrzk/moodtracker-frontend)
* [sebastianrzk/moodtracker-backend](https://registry.hub.docker.com/r/sebastianrzk/moodtracker-backend)

### Step 1 : Update parameters

* Have an oidc provider configured (realm + client id + client secret + all urls)
* Configure all values in the `client_secrets.json`
* Configure all values in the docker-compose.yml

### Step 2: Run it

'''
docker-compose up
'''

