(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/index.js
  var import_react12 = __toESM(__require("react"), 1);
  var import_client = __require("react-dom/client");

  // src/App.jsx
  var import_react11 = __toESM(__require("react"), 1);
  var import_react_router_dom3 = __require("react-router-dom");

  // src/pages/Home.js
  var import_react3 = __toESM(__require("react"), 1);

  // src/components/ProductList.js
  var import_react2 = __toESM(__require("react"), 1);

  // src/components/ProductItem.js
  var import_react = __toESM(__require("react"), 1);
  var import_react_router_dom = __require("react-router-dom");
  function ProductItem({ product }) {
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "product-item" }, /* @__PURE__ */ import_react.default.createElement("img", { src: product.image, alt: product.name }), /* @__PURE__ */ import_react.default.createElement("h3", null, product.name), /* @__PURE__ */ import_react.default.createElement("p", null, product.price), /* @__PURE__ */ import_react.default.createElement(import_react_router_dom.Link, { to: `/product/${product.id}` }, "View Details"));
  }
  var ProductItem_default = ProductItem;

  // src/components/ProductList.js
  function ProductList({ products: products2 }) {
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "product-list" }, products2.map((product) => /* @__PURE__ */ import_react2.default.createElement(ProductItem_default, { key: product.id, product })));
  }
  var ProductList_default = ProductList;

  // src/pages/Home.js
  var products = [
    // Example product data
    { id: 1, name: "Mango Ice Candy", price: "$5", image: "path/to/image1.jpg" },
    { id: 2, name: "Strawberry Ice Candy", price: "$5", image: "path/to/image2.jpg" }
    // Add more products as needed
  ];
  function Home() {
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "home" }, /* @__PURE__ */ import_react3.default.createElement("h1", null, "Welcome to Ice Candy E-Commerce"), /* @__PURE__ */ import_react3.default.createElement(ProductList_default, { products }));
  }
  var Home_default = Home;

  // src/pages/ProductPage.js
  var import_react4 = __toESM(__require("react"), 1);
  function ProductPage() {
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: "product-page" }, /* @__PURE__ */ import_react4.default.createElement("h1", null, "Product Details"));
  }
  var ProductPage_default = ProductPage;

  // src/pages/CartPage.js
  var import_react6 = __toESM(__require("react"), 1);

  // src/components/Cart.js
  var import_react5 = __toESM(__require("react"), 1);
  function Cart() {
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "cart" }, /* @__PURE__ */ import_react5.default.createElement("h2", null, "Your Cart"));
  }
  var Cart_default = Cart;

  // src/pages/CartPage.js
  function CartPage() {
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "cart-page" }, /* @__PURE__ */ import_react6.default.createElement(Cart_default, null));
  }
  var CartPage_default = CartPage;

  // src/pages/LoginPage.js
  var import_react8 = __toESM(__require("react"), 1);

  // src/components/Login.js
  var import_react7 = __toESM(__require("react"), 1);
  function Login() {
    return /* @__PURE__ */ import_react7.default.createElement("div", { className: "login" }, /* @__PURE__ */ import_react7.default.createElement("h2", null, "Login"));
  }
  var Login_default = Login;

  // src/pages/LoginPage.js
  function LoginPage() {
    return /* @__PURE__ */ import_react8.default.createElement("div", { className: "login-page" }, /* @__PURE__ */ import_react8.default.createElement(Login_default, null));
  }
  var LoginPage_default = LoginPage;

  // src/components/Header.js
  var import_react9 = __toESM(__require("react"), 1);
  var import_react_router_dom2 = __require("react-router-dom");
  function Header() {
    return /* @__PURE__ */ import_react9.default.createElement("header", null, /* @__PURE__ */ import_react9.default.createElement("nav", null, /* @__PURE__ */ import_react9.default.createElement("ul", null, /* @__PURE__ */ import_react9.default.createElement("li", null, /* @__PURE__ */ import_react9.default.createElement(import_react_router_dom2.Link, { to: "/" }, "Home")), /* @__PURE__ */ import_react9.default.createElement("li", null, /* @__PURE__ */ import_react9.default.createElement(import_react_router_dom2.Link, { to: "/cart" }, "Cart")), /* @__PURE__ */ import_react9.default.createElement("li", null, /* @__PURE__ */ import_react9.default.createElement(import_react_router_dom2.Link, { to: "/login" }, "Login")))));
  }
  var Header_default = Header;

  // src/components/Footer.js
  var import_react10 = __toESM(__require("react"), 1);
  function Footer() {
    return /* @__PURE__ */ import_react10.default.createElement("footer", null, /* @__PURE__ */ import_react10.default.createElement("p", null, "\xA9 2024 Ice Candy E-Commerce"));
  }
  var Footer_default = Footer;

  // src/App.jsx
  function App() {
    return /* @__PURE__ */ import_react11.default.createElement(import_react_router_dom3.BrowserRouter, null, /* @__PURE__ */ import_react11.default.createElement(Header_default, null), /* @__PURE__ */ import_react11.default.createElement(import_react_router_dom3.Switch, null, /* @__PURE__ */ import_react11.default.createElement(import_react_router_dom3.Route, { path: "/", component: Home_default, exact: true }), /* @__PURE__ */ import_react11.default.createElement(import_react_router_dom3.Route, { path: "/product/:id", component: ProductPage_default }), /* @__PURE__ */ import_react11.default.createElement(import_react_router_dom3.Route, { path: "/cart", component: CartPage_default }), /* @__PURE__ */ import_react11.default.createElement(import_react_router_dom3.Route, { path: "/login", component: LoginPage_default })), /* @__PURE__ */ import_react11.default.createElement(Footer_default, null));
  }
  var App_default = App;

  // src/index.js
  var container = document.getElementById("root");
  var root = (0, import_client.createRoot)(container);
  root.render(
    /* @__PURE__ */ import_react12.default.createElement(import_react12.default.StrictMode, null, /* @__PURE__ */ import_react12.default.createElement(App_default, null))
  );
})();
