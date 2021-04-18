import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

export const RootPage = defineComponent({
  setup() {
    const router = useRouter();
    onMounted(() => router.push("/login"));

    return () => <div>This is the root page</div>;
  },
});
