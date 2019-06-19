cif (state.messages) {
	var prvMsg = [];
	state.messages.forEach(item => {
		if (item.receiver_id == this.props.id & item.sender_Id== ) {
			friends.push(item);
		} else {
			pending.push(item);
		}
	});
}
