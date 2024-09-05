$(document).ready(function () {
	if (
		frappe.boot.setup_complete === 1 &&
		!frappe.is_mobile() &&
		frappe.user.has_role("System Manager")
	) {
		addManageBillingLinkInDropdown();
		frappe.call({
			method: "fc_saas_helper.api.current_site_info",
			callback: (r) => {
				const response = r.message;
				if (
					response.trial_end_date &&
					window.location.pathname != "/app/in-desk-billing"
				) {
					$(".layout-main-section").before(
						generateTrialSubscriptionBanner(response.trial_end_date)
					);
				}
			},
		});
	}
});

function generateTrialSubscriptionBanner(trialEndDate) {
	const trial_end_date = new Date(trialEndDate);
	const today = new Date();
	const diffTime = trial_end_date - today;
	const trial_end_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const trial_end_string =
		trial_end_days > 1 ? `${trial_end_days} days` : `${trial_end_days} day`;

	return $(`
			<div class="flex justify-content-center flex-col px-2 py-2"
				style="
					background-color: rgb(254 243 199);
					border-radius: 10px;
					margin-bottom: 20px;
					z-index: 1;"
			>
			<svg xmlns="http://www.w3.org/2000/svg" width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-alert-triangle my-auto"
			>
				<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
				<line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
			</svg>
			<p style="margin: auto 0; margin-right: 20px; padding-left: 10px;">
				Your trial ends in ${trial_end_string}. Please subscribe for uninterrupted services
			</p>
			<button id="show-dialog" type="button"
				class="
					button-renew
					px-2
					py-1
				"
				onclick="openBillingPage()"
				style="
					margin: auto;
					height: fit-content;
					background-color: transparent;
					border: 1px solid #171717;
					color: #171717;
					border-radius: 8px;
					margin-right: 0px;
					font-size: 13px;
				"
			>
			Subscribe
			</button>
			</div>
`);
}

function addManageBillingLinkInDropdown() {
	$(".dropdown-navbar-user .dropdown-menu .dropdown-item:nth-child(2)").after(
		`<a class="dropdown-item" onclick="openBillingPage()" target="_self">Manage Billing</a>`
	);
}

function openBillingPage() {
	window.location.href = "/app/in-desk-billing";
}
