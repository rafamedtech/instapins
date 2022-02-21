from django.db import models
import uuid


# Create your models here.

# Image directory path
def user_directory_path(instance, filename):
    return 'uploads/images/{0}/{1}'.format(instance.title, filename)

class Upload(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    title = models.CharField(max_length=250)
    image = models.ImageField(upload_to=user_directory_path, blank=True, null=True)

    def __str__(self):
        return self.title