export default function Dashboard() {
  return (
    <div className="container">
      <div className="row">
        <div className="column" style={{ padding: 0, paddingTop: "1em" }}>
          <div className="title">
            <h3>Friends</h3>
          </div>
          <div className="content">
            <ul>
              <li>
                <div className="friend-wrapper">
                  <div className="img-wrapper">
                    <img
                      src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                      alt="friend"
                    />
                  </div>
                  <div className="info">
                    <div className="name">Kevin Hart</div>
                    <div className="flex">
                      <div className="borrow-owe">
                        Borrowed: <span className="amount">$0</span>
                      </div>
                      <div className="borrow-owe">
                        Owed: <span className="amount">$0</span>
                      </div>
                    </div>
                  </div>
                  <div className="buttons-wrapper">
                    <button className="button">Borrow</button>
                    <button className="button">Provide</button>
                  </div>
                </div>
              </li>
              <li>
                <div className="friend-wrapper">
                  <div className="img-wrapper">
                    <img
                      src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                      alt="friend"
                    />
                  </div>
                  <div className="info">
                    <div className="name">Kevin Hart</div>
                    <div className="flex">
                      <div className="borrow-owe">
                        Borrowed: <span className="amount">$0</span>
                      </div>
                      <div className="borrow-owe">
                        Owed: <span className="amount">$0</span>
                      </div>
                    </div>
                  </div>
                  <div className="buttons-wrapper">
                    <button className="button">Borrow</button>
                    <button className="button">Provide</button>
                  </div>
                </div>
              </li>
              <li>
                <div className="friend-wrapper">
                  <div className="img-wrapper">
                    <img
                      src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                      alt="friend"
                    />
                  </div>
                  <div className="info">
                    <div className="name">Kevin Hart</div>
                    <div className="flex">
                      <div className="borrow-owe">
                        Borrowed: <span className="amount">$0</span>
                      </div>
                      <div className="borrow-owe">
                        Owed: <span className="amount">$0</span>
                      </div>
                    </div>
                  </div>
                  <div className="buttons-wrapper">
                    <button className="button">Borrow</button>
                    <button className="button">Provide</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
