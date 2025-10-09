<script lang="ts">
	import { CookieManager } from '$components'
	import { configuration } from './skcmConfig'
</script>

<slot />
<CookieManager {configuration} />
