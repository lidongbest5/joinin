from django.db import models
from django.contrib.auth.models import User
import datetime

class StudentUser(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=64,blank=True,null=True)
    avatar = models.CharField(max_length=128,blank=True,null=True)
    sex = models.IntegerField(blank=True,null=True)
    degree = models.IntegerField(blank=True,null=True)
    school = models.CharField(max_length=128,blank=True,null=True)
    major = models.CharField(max_length=128,blank=True,null=True)
    school_time = models.CharField(max_length=128,blank=True,null=True)
    label = models.TextField(blank=True,null=True)
    intro = models.TextField(blank=True,null=True)
    wechat = models.CharField(max_length=128,blank=True,null=True)
    weibo = models.CharField(max_length=128,blank=True,null=True)
    email = models.CharField(max_length=128,blank=True,null=True)
    def __unicode__(self):
        return self.name

class EventUser(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=64,blank=True,null=True)
    avatar = models.CharField(max_length=128,blank=True,null=True)
    label = models.TextField(blank=True,null=True)
    intro = models.TextField(blank=True,null=True)
    wechat = models.CharField(max_length=128,blank=True,null=True)
    weibo = models.CharField(max_length=128,blank=True,null=True)
    email = models.CharField(max_length=128,blank=True,null=True)
    def __unicode__(self):
        return self.name

class Event(models.Model):
    title = models.CharField(max_length=128)
    start_time = models.DateTimeField(blank=True)
    end_time = models.DateTimeField(blank=True)
    district = models.CharField(max_length=128,blank=True,null=True)
    place = models.TextField(blank=True,null=True)
    guest = models.TextField(blank=True,null=True)
    sponsor = models.TextField(blank=True,null=True)
    process = models.TextField(blank=True,null=True)
    category = models.CharField(max_length=128)
    files = models.CharField(max_length=128,blank=True,null=True)
    link = models.CharField(max_length=128,blank=True,null=True)
    image = models.CharField(max_length=128,blank=True,null=True)
    account = models.IntegerField(blank=True,null=True)
    status = models.IntegerField(blank=True,null=True)
    like = models.IntegerField(blank=True,null=True,default=0)
    price = models.CharField(max_length=128,blank=True,null=True)
    user = models.ForeignKey(EventUser)
    def __unicode__(self):
        return self.name

class Membership(models.Model):
    user = models.ForeignKey(StudentUser)
    event = models.ForeignKey(Event)
    date_joined = models.DateField()
    invite_reason = models.TextField(blank=True,null=True)
    reply_reason = models.TextField(blank=True,null=True)
    status = models.IntegerField()
    checkin = models.IntegerField()