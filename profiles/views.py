from django.contrib.auth.models import User
from django.views.generic import DetailView

from feed.models import Post
class ProfileDetailView(DetailView):
    http_method_names = ["get"]
    template_name = "profiles/detail.html"
    context_object_name = "user"
    model = User

    slug_field = "username"
    slug_url_kwarg = "username"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user = self.object

        context["total_posts"] = Post.objects.filter(
            author=user
        ).count()

        context["total_followers"] = (
            user.profile.followed_by.count()
        )


        return context