<script lang="ts">
	import type { PageProps } from './$types';

	const { form }: PageProps = $props();
</script>

<h2>Регистрация пользователя</h2>

{#if form?.error}
	<p class="text-red-400">{form?.error}</p>
{/if}
<form method="POST">
	<input type="text" name="username" placeholder="Имя пользователя" />
	<input type="password" name="password" placeholder="Пароль" />
	<button type="submit">Подтвердить</button>
</form>
