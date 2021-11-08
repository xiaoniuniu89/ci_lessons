from django.test import TestCase
from .models import Item

class TestModels(TestCase):
    def test_done_defaults_to_false(self):
        item = Item.objects.create(name='Test Todo Item')
        self.assertFalse(item.done)

    def test_item_string(self):
        item = Item.objects.create(name= 'Test todo Item')
        self.assertEqual(str(item), 'Test todo Item')
