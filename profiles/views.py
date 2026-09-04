from django.contrib.auth.models import User
from django.views.generic import DetailView

class ProfileDetailView(DetailView):
    http_method_names = ["get"]
    template_name = "profiles/detail.html"
    context_object_name = "user"
    model = User
    slug_field = "username"
    slug_url_kwarg = "username"