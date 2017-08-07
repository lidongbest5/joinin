# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect, HttpResponseNotFound, Http404, StreamingHttpResponse, HttpResponse
from django.db import connection
from joinin.models import *
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from datetime import datetime
import time
import json
import os
import hashlib
from PIL import Image as image
import random
import  urllib2
from django import forms
from django.core import serializers

def getUserData(types, user):
  if types == 1:
    user = user.studentuser
    userData = {
      "id": user.id,
      "name": user.name,
      "avatar": user.avatar,
      "sex": user.sex,
      "degree": user.degree,
      "school": user.school,
      "major": user.major,
      "school_time": user.school_time,
      "label": user.label,
      "intro": user.intro,
      "wechat": user.wechat,
      "weibo": user.weibo,
      "email": user.email,
    }
  else: 
    user = user.eventuser
    userData = {
      "id": user.id,
      "name": user.name,
      "avatar": user.avatar,
      "label": user.label,
      "intro": user.intro,
      "wechat": user.wechat,
      "weibo": user.weibo,
      "email": user.email,
    }
  return userData

def sessionRegister(request):
  if request.method == 'POST':
    data=json.loads(request.body)
    exist = User.objects.filter(username=data['phone'])
    if len(exist):
      return JsonResponse({"code": 2})
    else:
      user = User.objects.create_user(data['phone'], None, data['password'], last_name=data['type'])
      if data['type'] == 1:
        s = StudentUser(user=user)
        s.save()
      elif data['type'] == 2:
        s = EventUser(user=user)
        s.save()
      return JsonResponse({"code": 1, "type": data['type'], "id": s.id})

def sessionLogin(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    user = authenticate(username=data['phone'], password=data['password'])
    if user is not None:
      if user.is_active:
        if int(user.last_name) == int(data['type']):
          login(request, user)
          types = int(user.last_name);
          userData = getUserData(types, user)
          return JsonResponse({"code": 1, "type": types, "id": user.id, "user": userData})
        else:
          return JsonResponse({"code": 2, "error": 1})
    else:
      return JsonResponse({"code": 2, "error": 2})

def sessionAuth(request):
  if request.method == 'POST':
    if request.user.is_authenticated():
      types = int(request.user.last_name);
      userData = getUserData(types, request.user)
      return JsonResponse({"code": 1, "type": types, "id": request.user.id, "user": userData})
    else:
      return JsonResponse({"code": 2})

def sessionLogout(request):
  if request.method == 'POST':
    logout(request)
    return JsonResponse({"code": 1})

def updateStudent(request):
  if request.method == 'POST':
    data=json.loads(request.body)
    StudentUser.objects.filter(id=request.user.studentuser.id).update(name=data['name'], avatar=data['avatar'], sex=data['sex'], degree=data['degree'], school=data['school'], major=data['major'], school_time=data['school_time'], label=data['label'], intro=data['intro'], wechat=data['wechat'], weibo=data['weibo'], email=data['email'])
    return JsonResponse({"code": 1, "msg": "更新成功"})

def updateSponsor(request):
  if request.method == 'POST':
    data=json.loads(request.body)
    EventUser.objects.filter(id=request.user.eventuser.id).update(name=data['name'], avatar=data['avatar'], label=data['label'], intro=data['intro'], wechat=data['wechat'], weibo=data['weibo'], email=data['email'])
    return JsonResponse({"code": 1, "msg": "更新成功"})

def eventCreate(request):
  if request.method == 'POST':
    data=json.loads(request.body)
    start_time = datetime.strptime(data['start_time'], '%Y-%m-%d %H:%M')
    end_time = datetime.strptime(data['end_time'], '%Y-%m-%d %H:%M')
    e = Event(title=data['title'], start_time=start_time, end_time=end_time, place=data['place'], category=data['category'], image=data['image'], process=data['process'], guest=data['guest'], sponsor=data['sponsor'], user=request.user.eventuser)
    e.save()
    return JsonResponse({"code": 1})

def eventUpdate(request):
  if request.method == 'POST':
    data=json.loads(request.body)
    start_time = datetime.strptime(data['start_time'], '%Y-%m-%d %H:%M')
    end_time = datetime.strptime(data['end_time'], '%Y-%m-%d %H:%M')
    e = Event.objects.filter(id=data['id']).update(title=data['title'], start_time=start_time, end_time=end_time, place=data['place'], category=data['category'], image=data['image'], process=data['process'], guest=data['guest'], sponsor=data['sponsor'], user=request.user.eventuser)
    return JsonResponse({"code": 1, "msg": "更新成功"})

def eventDelete(request):
  if request.method == 'POST':
    data=json.loads(request.body)
    e = Event.objects.get(id=data['id'])
    e.delete()
    return JsonResponse({"code": 1})

def eventGet(request):
  if request.method == 'GET':
    eid = request.GET.get("id")
    data = Event.objects.filter(id=eid)
    return JsonResponse({"code": 1, "data": serializers.serialize("json", data)})

def eventStudent(request):
  if request.method == 'GET':
    m = Membership.objects.filter(user__id=request.user.studentuser.id)
    result = []
    for item in m:
      tmp = {}
      event = Event.objects.filter(id=item.event_id)
      tmp.update({"status": item.status, "checkin": item.checkin, "event": serializers.serialize("json", event)})
      result.append(tmp)
    return JsonResponse({"code": 1, "data": result})

def eventMembership(request):
  if request.method == 'GET':
    eid = request.GET.get("id")
    event = Event.objects.get(id=eid)
    user = request.user.studentuser
    m = Membership.objects.filter(event=event, user=user)
    if len(m):
      return JsonResponse({"code": 1, "status": m[0].status})
    else:
      return JsonResponse({"code": 1, "status": -1})

def eventRegister(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    eid = data['id']
    msg = data['msg']
    user = request.user.studentuser
    event = Event.objects.get(id=eid)
    Membership.objects.create(user=user, event=event, invite_reason=msg, date_joined=datetime.datetime.now(),status=0, checkin=0)
    return JsonResponse({"code": 1})

def eventCheck(request):
  if request.method == 'GET':
    eid = request.GET.get("id")
    m = Membership.objects.filter(event__id=eid)
    result = []
    for item in m:
      tmp = {}
      user = StudentUser.objects.get(id=item.user_id)
      tmp.update({"id":item.id, "date_joined": item.date_joined, "status": item.status, "invite_reason": item.invite_reason, "username": user.name, "school": user.school, "major": user.major})
      result.append(tmp)
    return JsonResponse({"code": 1, "data": result})

def eventCheckSet(request):
  if request.method == 'GET':
    mid = request.GET.get("id")
    status = request.GET.get("status")
    Membership.objects.filter(id=mid).update(status=status)
    return JsonResponse({"code": 1})

def eventsLike(request):
  if request.method == 'GET':
    eid = request.GET.get("id")
    count = Event.objects.get(id=eid).like
    Event.objects.filter(id=eid).update(like=count+1)
    return JsonResponse({"code": 1})

def eventsUser(request):
  if request.method == 'GET':
    pageNo = int(request.GET.get("pageNo"))
    pageSize = int(request.GET.get("pageSize"))
    if request.user.eventuser:
      uid = request.user.eventuser.id
    else:
      uid = request.user.studentuser.id
    data = Event.objects.filter(user__id=uid)
    count = data.count()
    if count%pageSize:
      page = int(count/pageSize) + 1
    else:
      page = int(count/pageSize)
    start = (pageNo-1)*pageSize
    end = pageNo*pageSize
    listData = data[start:end]
    return JsonResponse({"code": 1, "data": serializers.serialize("json", listData), "total": count, "page": page, "curPage": pageNo, "pageSize": pageSize})

def eventsRecoment(request):
  if request.method == 'GET':
    data = Event.objects.all().order_by('-like')[0:6]
    return JsonResponse({"code": 1, "data": serializers.serialize("json", data)})

def eventsAll(request):
  if request.method == 'GET':
    pageNo = int(request.GET.get("pageNo"))
    pageSize = int(request.GET.get("pageSize"))
    q = request.GET.get("q")
    category = request.GET.get("category")
    startDate = request.GET.get("startDate")
    endDate = request.GET.get("endDate")
    data = Event.objects.all().order_by('-id')
    if len(q):
      data = data.filter(title__contains=q)
    if category != 'all':
      data = data.filter(category=category)
    if len(startDate):
      data = data.filter(start_time__gt=datetime.fromtimestamp(float(startDate)/1000.0))
    if len(endDate):
      data = data.filter(end_time__lt=datetime.fromtimestamp(float(endDate)/1000.0))
    count = data.count()
    if count%pageSize:
      page = int(count/pageSize) + 1
    else:
      page = int(count/pageSize)
    start = (pageNo-1)*pageSize
    end = pageNo*pageSize
    listData = data[start:end]
    return JsonResponse({"code": 1, "data": serializers.serialize("json", listData), "total": count, "page": page, "curPage": pageNo, "pageSize": pageSize})

def upload(request):
  if request.method == 'POST':
      file_ext = request.FILES['file'].name.split('.')[-1]
      file_name = time.strftime('%Y%m%d%H%M%S') + hashlib.md5(
          request.FILES['file'].name.encode('utf-8').split('.')[0]).hexdigest()
      user_upload_folder = os.path.join("joinin", "upload")
      # user_upload_folder = os.path.join(user_upload_folder, "upload")
      # user_upload_folder = os.path.join(user_upload_folder,"images")
      file_upload = open(os.path.join(user_upload_folder,
                                      file_name + '.' + file_ext), 'w')
      file_upload.write(request.FILES['file'].read())
      file_upload.close()
      img_name = file_name + '.' + file_ext
      new_img_name = 'm_' + file_name + '.' + file_ext
      path = os.path.dirname(__file__) + '/../joinin/upload/'
      resizeImg(ori_img=path + img_name, dst_img=path +
                new_img_name, dst_w=300, dst_h=300, save_q=80)
      if request.POST.get("id"):
        return JsonResponse({"code": 1, "id": request.POST.get("id"), "name": file_name + '.' + file_ext})
      else:
        return JsonResponse({"code": 1, "name": file_name + '.' + file_ext})

def resizeImg(**args):
  args_key = {'ori_img': '', 'dst_img': '',
              'dst_w': '', 'dst_h': '', 'save_q': 75}
  arg = {}
  for key in args_key:
      if key in args:
          arg[key] = args[key]
  im = image.open(arg['ori_img'])
  ori_w, ori_h = im.size
  widthRatio = heightRatio = None
  ratio = 1
  if (ori_w and ori_w > arg['dst_w']) or (ori_h and ori_h > arg['dst_h']):
      if arg['dst_w'] and ori_w > arg['dst_w']:
          widthRatio = float(arg['dst_w']) / ori_w
      if arg['dst_h'] and ori_h > arg['dst_h']:
          heightRatio = float(arg['dst_h']) / ori_h
      if widthRatio and heightRatio:
          if widthRatio < heightRatio:
              ratio = widthRatio
          else:
              ratio = heightRatio
      if widthRatio and not heightRatio:
          ratio = widthRatio
      if heightRatio and not widthRatio:
          ratio = heightRatio
      newWidth = int(ori_w * ratio)
      newHeight = int(ori_h * ratio)
  else:
      newWidth = ori_w
      newHeight = ori_h
  im.resize((newWidth, newHeight), image.ANTIALIAS).save(
      arg['dst_img'], quality=arg['save_q'])

def clipResizeImg(**args):
  args_key = {'ori_img': '', 'dst_img': '',
              'dst_w': '', 'dst_h': '', 'save_q': 75}
  arg = {}
  for key in args_key:
      if key in args:
          arg[key] = args[key]
  im = image.open(arg['ori_img'])
  ori_w, ori_h = im.size
  dst_scale = float(arg['dst_h']) / arg['dst_w']
  ori_scale = float(ori_h) / ori_w
  if ori_scale >= dst_scale:
      width = ori_w
      height = int(width * dst_scale)
      x = 0
      y = (ori_h - height) / 3
  else:
      height = ori_h
      width = int(height * dst_scale)
      x = (ori_w - width) / 2
      y = 0
  box = (x, y, width + x, height + y)
  newIm = im.crop(box)
  im = None
  ratio = float(arg['dst_w']) / width
  newWidth = int(width * ratio)
  newHeight = int(height * ratio)
  newIm.resize((newWidth, newHeight), image.ANTIALIAS).save(
      arg['dst_img'], quality=arg['save_q'])
