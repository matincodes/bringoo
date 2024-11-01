<script lang="ts">
	import { page } from '$app/stores';

	interface NavData {
		label: string;
		icon: string;
		activeIcon: string;
		path: string;
	}

	let navitems: NavData[] = [
		{
			label: 'Dashbord',
			icon: 'images/dash.svg',
			activeIcon: 'images/dash-active.svg',
			path: '/dashboard'
		},
		{
			label: 'Orders',
			icon: 'images/order.svg',
			activeIcon: 'images/order-active.svg',
			path: '/orders'
		},
		{
			label: 'Containers',
			icon: 'images/container.svg',
			activeIcon: 'images/container-active.svg',
			path: '/containers'
		},
		{
			label: 'Personnel',
			icon: 'images/personnel.svg',
			activeIcon: 'images/personnel-active.svg',
			path: '/personnel'
		},
		{
			label: 'Trucks',
			icon: 'images/truck.svg',
			activeIcon: 'images/truck-active.svg',
			path: '/trucks'
		},
		{
			label: 'Financials',
			icon: 'images/financial.svg',
			activeIcon: 'images/financial-active.svg',
			path: '/financials'
		},
		{
			label: 'Customers',
			icon: 'images/customers.svg',
			activeIcon: 'images/customers-active.svg',
			path: '/customers'
		}
	];

	let activePath = '/dashboard';

	const handleNavigation = (path: string): void => {
		activePath = path;
	};
</script>

<header class="col-span-1">
	<div class="mb-5 py-7 border-b-2 mx-2">
		<img src="images/Logo.svg" alt="Bringoo Logo" class="mx-auto" />
	</div>

	<nav>
		<ul class="list-none">
			{#each navitems as items}
				<li class:active={$page.url.pathname === items.path}>
					<a on:click={() => handleNavigation(items.path)} href={items.path}>
						<img
							src={activePath === items.path ? items.activeIcon : items.icon}
							alt={items.label}
						/>
						<span>{items.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style lang="postcss">
	nav ul li {
		@apply mx-2 py-4;
	}

	nav ul li.active {
		@apply rounded-md bg-navBlueLight;
	}

	nav ul li.active a {
		@apply font-[500] text-navBlueDark;
	}

	nav ul li a {
		@apply flex flex-col items-center justify-center pt-1 text-[14px] font-[400] text-navGray;
	}
</style>
