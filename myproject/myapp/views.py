from django.views import View
from django.http import JsonResponse
import json
import matplotlib.pyplot as plt
import base64
from io import BytesIO

class GenerateGraphView(View):
    def get(self, request, *args, **kwargs):
        data = request.GET.get('data')
        data_dict = json.loads(data)

        # Extract the revenue data
        revenues = {
            'AFC Revenue (A)': data_dict['AFC Revenue (A)'],
            'Travel Revenue (B)': data_dict['Travel Revenue (B)'],
            'Famoco Revenue (C)': data_dict['Famoco Revenue (C)'],
            'QR Online Revenue (D)': data_dict['QR Online Revenue (D)'],
            'QR Paper Revenue (E)': data_dict['QR Paper Revenue (E)'],
            'Static QR Revenue (E1)': data_dict['Static QR Revenue (E1)'],
            'Whats App QR Revenue (E2)': data_dict['Whats App QR Revenue (E2)'],
            'Paytm App QR Revenue (E3)': data_dict['Paytm App QR Revenue (E3)'],
            'PhonePe App QR Revenue (E4)': data_dict['PhonePe App QR Revenue (E4)'],
            'NCMCRevenue (E5)': data_dict['NCMCRevenue (E5)'],
        }

        # Generate the bar graph
        plt.bar(revenues.keys(), revenues.values())
        plt.xticks(rotation=90)
        plt.tight_layout()

        # Save the graph to a BytesIO object
        buf = BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)

        # Convert the BytesIO object to a base64 string
        img_str = base64.b64encode(buf.read())

        # Decode the base64 string
        img_str = img_str.decode('utf-8')

        return JsonResponse({'graph': img_str})