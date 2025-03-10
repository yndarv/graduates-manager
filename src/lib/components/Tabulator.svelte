<script lang="ts">
	import { onMount } from 'svelte';
	import {
		TabulatorFull as Tabulator,
		type ColumnDefinition,
		type Options as TabulatorOptions
	} from 'tabulator-tables';
	import 'tabulator-tables/dist/css/tabulator_materialize.min.css';

	export interface TabulatorProps extends TabulatorOptions {
		columns: ColumnDefinition[];
	}

	let { data, ...props }: TabulatorProps = $props();

	let tableComponent: HTMLElement;

	onMount(() => {
		new Tabulator(tableComponent, {
			data: data,
			reactiveData: true,
			...props
		});
	});
</script>

<div bind:this={tableComponent}></div>
