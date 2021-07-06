import { ref, reactive, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { AddressList, NavBar } from "vant";
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { AddressInfo } from "./address"


export default defineComponent(() => {
  const router = useRouter()
  const store = useStore()
  const chosenAddressId = ref()
  const localAddress = getLocalStorage('addressList')

  const list: Array<AddressInfo> = reactive(localAddress || [
    {
      id: 1,
      name: '张三',
      tel: '13012345678',
      address: '浙江省宁波市鄞州区',
      ads: "鄞州公园",
      city: ["浙江省", "宁波市", "鄞州区"],
      isDefault: true,
    },
    {
      id: 2,
      name: '李四',
      tel: '13112345678',
      address: '浙江省宁波市东钱湖',
      ads: "东钱湖公园",
      city: ["浙江省", "宁波市", "东钱湖"],
      isDefault: false,
    }
  ])

  if (!localAddress) setLocalStorage('addressList', list)

  const onAdd = () => {
    router.push('/address/edit')
  }
  const onEdit = (item: any) => {
    store.commit('setSelectAddress', item)
    router.push('/address/edit')
  }

  const onClickLeft = () => {
    router.back()
  }

  return () => {
    return (
      <div class="pd-nav" style="background:#f7f8fa;min-height:100vh">
        <NavBar fixed title="地址管理" left-text="返回" left-arrow onClick-left={onClickLeft} />
        <AddressList
          v-model={chosenAddressId.value}
          list={list}
          defaultTagText="默认"
          onAdd={onAdd}
          onEdit={onEdit}
        />
      </div >
    );
  }
})