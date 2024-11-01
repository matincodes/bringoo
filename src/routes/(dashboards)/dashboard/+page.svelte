<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	// Chart.register(BarElement, CategoryScale, LinearScale, Title);

	// Define an interface for the weeksData object
	interface WeeksData {
		currentWeek: number[];
		previousWeek: number[];
		otherWeek: number[];
	}

	let chart: Chart | null = null;
	let selectedWeek: keyof WeeksData = 'previousWeek';

	// Weekly order data
	const weeksData: WeeksData = {
		currentWeek: [12, 9, 7, 15, 5, 10, 8],
		previousWeek: [5, 8, 2, 11, 9, 11, 6],
		otherWeek: [7, 11, 5, 13, 3, 8, 6]
	};

	const daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// Function to render the chart
	function renderChart(): void {
		const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
		if (chart) chart.destroy(); // Destroy previous chart if it exists

		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: daysOfWeek,
				datasets: [
					{
						label: 'Orders',
						data: weeksData[selectedWeek],
						backgroundColor: '#4C9EEB',
						borderColor: '#4C9EEB',
						borderWidth: 1,
						borderRadius: 100, // Curved top
						barPercentage: 0.2,
						categoryPercentage: 0.5
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						max: 15,
						grid: {
							display: true // Show Y-axis grid lines
						},
						border: {
							display: false // Remove the Y-axis border line
						},
						ticks: {
							stepSize: 1,
							callback: function (value) {
								// Only display 0, 1, 5, 10, 15
								if (value === 0 || value === 1 || value === 5 || value === 10 || value === 15) {
									return value;
								}
								return null; // Do not display other values
							}
						}
					},
					x: {
						grid: {
							display: false // Hide X-axis grid lines
						},

						ticks: {
							display: true
						}
					}
				},
				plugins: {
					title: {
						display: false,
						text: 'Order Activity',
						align: 'start' // Align the title to the top-left
					},
					legend: {
						display: false // Hide the chart legend
					}
				}
			}
		});
	}

	// Re-render the chart when the week is changed
	function updateWeek(week: keyof typeof weeksData) {
		selectedWeek = week;
		renderChart();
	}

	// Render the chart when the component is mounted
	onMount(() => {
		renderChart();
	});
</script>

<svelte:head>
	<!-- title -->
	<title>DashBoard | Bringoo Logistics</title>
</svelte:head>

<!-- Orders -->
<div
	class="bg-white rounded-lg flex items-center justify-center
 py-5 my-2 mb-6 text-tLightPurple space-x-20"
>
	<div class="flex items-center pr-16 py-3 border-r-2">
		<div class="bg-[#62A6E5] rounded-full mr-6">
			<img src="images/truck-white.svg" alt="" class="p-2" />
		</div>
		<div>
			<p class="text-base font-[600]">All Orders</p>
			<p class="font-[400] text-lg">5000</p>
		</div>
	</div>

	<div class="flex items-center pr-16 py-3 border-r-2">
		<div class="bg-bgreen rounded-full mr-6">
			<img src="images/truck-white.svg" alt="" class="p-2" />
		</div>
		<div>
			<p class="text-base font-[600]">Completed Orders</p>
			<p class="font-[400] text-lg">5000</p>
		</div>
	</div>

	<div class="flex items-center pr-16 py-3 border-r-2">
		<div class="bg-borange rounded-full mr-6">
			<img src="images/truck-white.svg" alt="" class="p-2" />
		</div>
		<div>
			<p class="text-base font-[600]">Pending Orders</p>
			<p class="font-[400] text-lg">5000</p>
		</div>
	</div>

	<div class="flex items-center pr-12 py-3">
		<div class="bg-[#1A4FBA] rounded-full mr-6">
			<img src="images/truck-white.svg" alt="" class="p-2" />
		</div>
		<div>
			<p class="text-base font-[600]">Ongoing Orders</p>
			<p class="font-[400] text-lg">5000</p>
		</div>
	</div>
</div>

<div class="w-full flex gap-10">
	<!-- Chart Container -->
	<div class="w-[65%] h-[450px] bg-white p-4 rounded-lg overflow-hidden">
		<div class="flex justify-between items-center mb-2">
			<h2 class="text-xl font-[600] text-tLightPurple">Order Activity</h2>
			<!-- Dropdown menu using shadcn-svelte -->
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button class="px-7 py-1 text-[#001C77] border-2 border-[#C1D0FF] rounded-md"
						>Select Week</button
					>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Weeks</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={() => updateWeek('currentWeek')}
							>Current Week</DropdownMenu.Item
						>
						<DropdownMenu.Item on:click={() => updateWeek('previousWeek')}
							>Previous Week</DropdownMenu.Item
						>
						<DropdownMenu.Item on:click={() => updateWeek('otherWeek')}
							>Other Week</DropdownMenu.Item
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<!-- Full-width chart area -->
		<div class="h-[90%] w-[100%]">
			<canvas id="ordersChart" class="h-full w-full"></canvas>
			<!-- Smaller height and full width -->
		</div>
	</div>

	<div class="items-center bg-[#D5EAFC] py-7 px-5 text-center rounded-lg">
		<div>
			<img src="images/TruckerBringoo.svg" alt="Bringoo Truck" class="w-[90%]" />
		</div>

		<div class="flex flex-col items-center gap-10 font-poppins">
			<h2 class="text-[#343861] text-2xl font-[600] font-poppins w-2/3 pt-3">
				Initiate a new order and assign it to a driver
			</h2>

			<button class="bg-white px-7 py-3 text-[#001C77] rounded-lg font-[700]">Add Order</button>
		</div>
	</div>
</div>

<div class="flex flex-row gap-10 mt-8 mb-16">
	<div class="rounded-md bg-white w-2/4 p-3">
		<div class="flex flex-row justify-between items-center">
			<h2 class="text-xl font-[600] text-tLightPurple">Ongoing Orders</h2>
			<p class=" text-[#2F6FED] font-[600]"><a href="#">View all</a></p>
		</div>
		<div class="rounded-xl my-4 mx-2 shadow-lg px-4 py-5">
			<p class="flex flex-row justify-between">
				<span class="text-sm font-[300] text-[#000000B2]">Order 87900-00900</span>
				<span class="text-sm font-[300] text-[#000000B2]">Order type</span>
			</p>
			<h2 class="text-[#314A7D] font-[500] text-xl pb-3">Delivery of Name of Item</h2>
			<p class="text-sm font-[500] text-[#000000B2]">Ikeja - Iyanoworo</p>
		</div>
		<div class="rounded-xl my-4 mx-2 shadow-lg px-4 py-5">
			<p class="flex flex-row justify-between">
				<span class="text-sm font-[300] text-[#000000B2]">Order 87900-00900</span>
				<span class="text-sm font-[300] text-[#000000B2]">Order type</span>
			</p>
			<h2 class="text-[#314A7D] font-[500] text-xl pb-3">Delivery of Name of Item</h2>
			<p class="text-sm font-[500] text-[#000000B2]">Ikeja - Iyanoworo</p>
		</div>
	</div>
	<div class="rounded-md bg-white w-2/4 p-3">
		<div class="flex flex-row justify-between items-center">
			<h2 class="text-xl font-[600] text-tLightPurple">Truck Health</h2>
			<p class=" text-[#2F6FED] font-[600]"><a href="#">View all</a></p>
		</div>
		<div class="rounded-xl my-4 mx-2 shadow-lg px-4 py-5">
			<p class="flex flex-row justify-between">
				<span class="text-sm font-[300] text-[#000000B2]">Truck ID - 0005</span>
				<span class="text-sm font-[300] text-[#000000B2]">No reported faults</span>
			</p>
			<h2 class="text-[#314A7D] font-[500] text-lg pb-2">Truck status</h2>
			<div>
				<p class="flex justify-end pr-1 pb-1 text-[#000000B2] text-sm font-[500]">
					Due in 20 rides
				</p>
				<div class="w-full h-3 bg-[#F2F2F2] relative rounded-lg">
					<!-- Progress indicator -->
					<div class="h-full bg-[#71DDB1] rounded-lg w-1/3"></div>
				</div>
			</div>
		</div>
		<div class="rounded-xl my-4 mx-2 shadow-lg px-4 py-5">
			<p class="flex flex-row justify-between">
				<span class="text-sm font-[300] text-[#000000B2]">Truck ID - 0006</span>
				<span class="text-sm font-[300] text-[#AC0516]">Break pad failure</span>
			</p>
			<h2 class="text-[#314A7D] font-[500] text-xl pb-3">Undergoing fixes at the mechanic</h2>
			<div>
				<p class="flex justify-end pr-1 pb-1 text-[#000000B2] text-sm font-[500]">Due in 7 rides</p>
				<div class="w-full h-3 bg-[#F2F2F2] relative rounded-lg">
					<!-- Progress indicator -->
					<div class="h-full bg-[#FFAD47] rounded-lg w-4/5"></div>
				</div>
			</div>
		</div>
	</div>
</div>
