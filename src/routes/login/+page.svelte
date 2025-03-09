<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { form }: PageProps = $props();
</script>

<h2>Авторизация</h2>

{#if form?.error}
	<p class="text-red-400">{form?.error}</p>
{/if}
<form method="POST" use:enhance>
	<input type="text" name="username" placeholder="Имя пользователя" autocomplete="username" />
	<input type="password" name="password" placeholder="Пароль" autocomplete="current-password" />
	<button type="submit">Войти</button>
</form>
