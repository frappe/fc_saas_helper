frappe.pages["in-desk-billing"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: "Manage Billing",
		single_column: true,
	});
	loadBillingPage();
	initiateMessageEventHandler();
};

function initiateMessageEventHandler() {
	window.addEventListener("message", (e) => {
		if (e.data == "modal:show") {
			showBackdrop();
		} else if (e.data == "modal:hide") {
			removeBackdrop();
		}
	});
}

function sendMessageToIframe(message) {
	let iframe = document
		.getElementById("billing-iframe-wrapper")
		.getElementsByTagName("iframe")[0];
	iframe.contentWindow.postMessage(message, "*");
}

function getContainerToInjectPage() {
	if ($("#billing-iframe-wrapper").length) {
		return $("#billing-iframe-wrapper");
	} else {
		let container = $("<div>", {
			id: "billing-iframe-wrapper",
			style: "width: 100%; position: relative;",
		});
		$(document).find(".layout-main-section").first().append(container);
		return container;
	}
}

function loadBillingPage() {
	frappe.call({
		method: "fc_saas_helper.api.get_integrated_billing_dashboard_url",
		freeze: true,
		freeze_message: __("Loading..."),
		callback: (r) => {
			if (r.message) {
				// add iframe
				getContainerToInjectPage().html(`
                    <div style="
						position:relative;
						height: 85vh;
						overflow:hidden;
						background-color: white;
						border-radius: 12px;
						">
                        <iframe
                            src="${r.message}"
                            style="position: relative; top: 0px; width: 100%; height: 85vh;"
                            frameborder="0"
                        >
                    </div>
                `);
				// Add backdrop
				const backdrop = $("<div>", {
					id: "billing-backdrop",
					style: `
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: #00000045;
						z-index: 1040;
						display: none;
					`,
				});
				$("body").append(backdrop);
				backdrop.click(() => {
					sendMessageToIframe("backdrop_clicked");
				});
			}
		},
	});
}

function showBackdrop() {
	$("#billing-iframe-wrapper").css("z-index", "1050");
	$("#billing-backdrop").css("display", "block");
}

function removeBackdrop() {
	$("#billing-iframe-wrapper").css("z-index", "");
	if ($("#billing-backdrop").length) {
		$("#billing-backdrop").css("display", "none");
	}
}
