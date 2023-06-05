<script>
    import "../app.css";
</script>
  
<div class=" main min-h-screen flex flex-col text-black">
	<slot />
</div>

<style>
	.main {
		overflow: auto;
		font-family: 'Nunito Sans', 'sans-serif';
	}
</style>