from django.shortcuts import redirect
from django.http import HttpResponse


def page_access(allowed=[]):
   def decorator(view_func):
      def wrapper_func(request, *args, **kwargs):
         
         group = None
         if request.user.groups.exists():
            group = request.user.groups.all()[0].name
         if group in allowed:
            return view_func(request, *args, **kwargs)
         else:
            return redirect('dashboard')  
      return wrapper_func
   return decorator            




   