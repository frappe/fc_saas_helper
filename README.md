### Frappe Cloud Saas Helper
This is a small frappe based app that has some dedicated task
- Showing the subscription banner based on current plan of site and team's onboarding details
- Generate the short-lived access token to load the frappe cloud in-desk checkout page securely
- Have a custom page for billing at `/app/in-desk-billing` route which will load the in-desk checkout page

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/fc_saas_helper
pre-commit install
```

### License

apache-2.0
