export default function ServiceForm({ service = {}, onSubmit }) {
  function _onSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    onSubmit({
      ...data,
      offerer: {
        name: data.offerer,
      },
    });
  }
  return (
    <form onSubmit={_onSubmit}>
      <label>
        Name
        <input
          name="name"
          defaultValue={service.name}
          placeholder="Enter the service name"
          required
          autoFocus
        />
      </label>
      <label>
        Offerer
        <input
          name="offerer"
          defaultValue={service.offerer?.name}
          placeholder="Enter the offerer name"
          required
        />
      </label>
      <label>
        Price
        <input
          name="price"
          type="number"
          defaultValue={service.price}
          placeholder="Enter the service price"
          required
        />
      </label>
      <label>
        Image
        <input
          name="image"
          defaultValue={service.image}
          placeholder="Enter the service image"
          required
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          type="price"
          defaultValue={service.description}
          placeholder="Enter the service description"
          required
        />
      </label>
      <button>Save</button>
    </form>
  );
}
