<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';

	const { children, data } = $props<{ children: unknown; data: { user?: { username: string } } }>();
	const user = data?.user;

	async function logout() {
		await fetch('/api/logout', { method: 'POST' });
		window.location.href = '/login';
	}
</script>

<header class="bg-gray-100 shadow-md px-6 py-4">
	<nav class="flex items-center justify-between">
		<a href="/" class="text-xl font-bold">Выпускники БрГТУ</a>
		<ul class="flex space-x-6 text-lg">
			<li>
				<a
					href="/graduates"
					class={page.url.pathname === '/graduates' ? 'text-blue-600 font-semibold' : ''}
					>Выпускники</a
				>
			</li>
			<li>
				<a
					href="/unemployed"
					class={page.url.pathname === '/unemployed' ? 'text-blue-600 font-semibold' : ''}
					>Не трудоустроенные</a
				>
			</li>
			<li>
				<a href="/dist" class={page.url.pathname === '/dist' ? 'text-blue-600 font-semibold' : ''}
					>Распределённые</a
				>
			</li>
			<li>
				<a
					href="/redist"
					class={page.url.pathname === '/redist' ? 'text-blue-600 font-semibold' : ''}
					>Перераспределённые</a
				>
			</li>
		</ul>
		<div class="flex items-center space-x-4">
			{#if user}
				<span class="text-gray-700">Авторизованы как {user.username}</span>
				<button
					class="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
					onclick={logout}>Выход</button
				>
			{:else}
				<a
					href="/login"
					class="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
					>Вход</a
				>
			{/if}
		</div>
	</nav>
</header>

<main class="p-6">
	{@render children()}
</main>
