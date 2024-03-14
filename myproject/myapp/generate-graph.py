from django.http import JsonResponse
from django.views import View
import matplotlib.pyplot as plt
import base64
from io import BytesIO
import json

class GenerateGraphView(View):
    def get(self, request, *args, **kwargs):
        data = request.GET.get('data')
        # Convert the data from string to dictionary
        data_dict = json.loads(data)

        # Generate the bar graph
        plt.bar(data_dict.keys(), data_dict.values())
        plt.savefig('graph.png')

        # Convert the graph to a base64 string
        with open("graph.png", "rb") as img_file:
            b64_string = base64.b64encode(img_file.read())

        # Send the base64 string back in the response
        return JsonResponse({'graph': b64_string.decode('utf-8')})
