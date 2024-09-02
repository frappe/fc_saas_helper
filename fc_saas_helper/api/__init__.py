import frappe
import requests

def get_base_url():
    url = "https://frappecloud.com"
    if frappe.conf.developer_mode and frappe.conf.get("fc_saas_helper_base_url"):
        url = frappe.conf.get("fc_saas_helper_base_url")
    return url

def get_site_name():
    site_name = frappe.local.site
    if frappe.conf.developer_mode and frappe.conf.get("fc_saas_helper_site_name"):
        site_name = frappe.conf.get("fc_saas_helper_site_name")
    return site_name

def get_headers():
    # check if user is system manager
    if frappe.get_roles(frappe.session.user).count("System Manager") == 0:
        frappe.throw("You are not allowed to access this resource")

    # check if communication secret is set
    if not frappe.conf.get("fc_communication_secret"):
        frappe.throw("Communication secret not set")

    return {
        "X-Site-Token": frappe.conf.get("fc_communication_secret"),
        "X-Site": get_site_name()
    }

@frappe.whitelist()
def generate_access_token():
    request = requests.post(f"{get_base_url()}/api/method/press.saas.api.auth.generate_access_token", headers=get_headers())
    if request.status_code == 200:
        return request.json()["message"]
    else:
        frappe.throw("Failed to generate access token")


@frappe.whitelist()
def get_integrated_billing_dashboard_url():
    return f"{get_base_url()}/dashboard/in-desk-billing/{generate_access_token()}"

@frappe.whitelist()
def current_site_info():
    request = requests.post(f"{get_base_url()}/api/method/press.saas.api.site.info", headers=get_headers())
    if request.status_code == 200:
        return request.json()["message"]
    else:
        frappe.throw("Failed to get site info")