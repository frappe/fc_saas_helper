### Frappe Cloud Saas Helper
This is a small frappe based app that has some specific tasks for SaaS FC sites
- Showing the subscription banner based on current plan of site and team's onboarding details
- Generate the short-lived access token to load the frappe cloud in-desk checkout page securely
- Have a custom page for billing at `/app/in-desk-billing` route which will load the in-desk checkout page

### Site Configuration
- `fc_communication_secret` : This is the permanent secret key to communicate with frappe cloud from saas site

**Note** : This key is mandatory for this app to work. This should be injected to site config by frappe cloud.
> In case of development, we can grab the SaaS Communication Secret from frappe cloud desk [Site Record > Miscellaneous Tab > SaaS Section > SaaS Communication Secret] and put that manually in site config.

### Development
While using this app with local frappe cloud setup, you can add some configuration in site config
- `fc_saas_helper_base_url` : This is the base url of your frappe cloud instance (i.e. http://fc.cloud:8000)
- `fc_saas_helper_site_name` : This is the saas site name (i.e. abc.tanmoy.fc.frappe.dev)

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/fc_saas_helper
pre-commit install
```

### License

apache-2.0
