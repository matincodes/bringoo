<script lang="ts">
	import { formatDate } from '$utils/dateUtils';
	import { page } from '$app/stores';

	$: path = $page.url.pathname.split('/').pop() || '';

	function getDisplayText(path: string): string {
		return path.charAt(0).toUpperCase() + path.slice(1);
	}

	$: displayText = getDisplayText(path);

	let isDarkMode = false;

	function toggleMode() {
		isDarkMode = !isDarkMode;
	}
</script>

<div class="flex justify-between items-center">
	<div>
		<div class="font-[400] font-inter text-sm text-tgray">
			{formatDate()}
		</div>
		<div class="font-[500] text-xl text-navBlueDark">
			{displayText}
		</div>
	</div>

	<div class="flex justify-center items-center space-x-6">
		<div>
			<img src="images/notification.svg" alt="Notification" />
		</div>

		<div>
			<img src="images/settings.svg" alt="Settings" />
		</div>

		<button
			class="bg-[#BACEDF] flex cursor-pointer items-center gap-3 rounded-full p-1"
			on:click={toggleMode}
		>
			<div
				class="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-700 ease-in-out"
				class:bg-white={!isDarkMode}
			>
				<img src="images/light.svg" alt="Light" class="w-5 h-5" />
			</div>
			<div
				class="w-6 h-6 rounded-full flex justify-center items-center transition-colors duration-700 ease-in-out"
				class:bg-[#0D0D0D]={isDarkMode}
			>
				<img src="images/moon.svg" alt="Moon" class="w-4 h-4" />
			</div>
		</button>
	</div>
</div>
