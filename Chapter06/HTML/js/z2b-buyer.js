/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// z2b-buyer.js

var creds;
var connection;
var connectionProfileName = "z2b-test-profile";
var networkFile = "zerotoblockchain-network.bna"
var businessNetwork = "zerotoblockchain-network";
var members;
var orderDiv = "orderDiv";
var itemTable = {};
var sellerTable = {};
var newItems = [];
var totalAmount = 0;

var orderStatus = {
  Created: {code: 1, text: 'Order Created'},
  Bought: {code: 2, text: 'Order Purchased'},
  Cancelled: {code: 3, text: 'Order Cancelled'},
  Ordered: {code: 4, text: 'Order Submitted to Provider'},
  ShipRequest: {code: 5, text: 'Shipping Requested'},
  Delivered: {code: 6, text: 'Order Delivered'},
  Delivering: {code: 15, text: 'Order being Delivered'},
  Backordered: {code: 7, text: 'Order Backordered'},
  Dispute: {code: 8, text: 'Order Disputed'},
  Resolve: {code: 9, text: 'Order Dispute Resolved'},
  PayRequest: {code: 10, text: 'Payment Requested'},
  Authorize: {code: 11, text: 'Payment Apporoved'},
  Paid: {code: 14, text: 'Payment Processed'},
  Refund: {code: 12, text: 'Order Refund Requested'},
  Refunded: {code: 13, text: 'Order Refunded'}
};

/**
 * load the administration User Experience
 */
function loadBuyerUX ()
{
  toLoad = "buyer.html";
  $.when($.get(toLoad)).done(function (page)
    {$("#body").empty();
    $("#body").append(page);
    var _create = $("#newOrder");
    var _list = $("#orderStatus");
    var _orderDiv = $("#"+orderDiv);
    _create.on('click', function(){displayOrderForm();});
    _list.on('click', function(){listOrders()});
    var options = {};
    options.registry = 'Buyer';
    $.when($.post('/composer/admin/getMembers', options)).done(function (_results)
      { console.log(_results);
        members = _results.members;
        $("#buyer").empty();
        for (each in members)
          {(function(_idx, _arr){
            $("#buyer").append('<option value="'+_arr[_idx].id+'">' +_arr[_idx].id+'</option>');;
          })(each, members)}
        $("#company")[0].innerText = members[0].companyName;
        $("#buyer").on('change', function() { $("#company")[0].innerText = findMember($("#buyer").find(":selected").text(),members).companyName; });
      });
    });
}
/**
 * Displays the create order form for the selected buyer
 */

function displayOrderForm()
{  toLoad = "createOrder.html"; var options={}; options.registry="Seller";
totalAmount = 0;
newItems = [];
$.when($.get(toLoad), $.get('/composer/client/getItemTable'), $.post('/composer/admin/getMembers', options)).done(function (page, _items, _sellers)
  {  sellerTable = _sellers[0].members;
    itemTable = _items[0].items;
    let _orderDiv = $("#"+orderDiv);
    _orderDiv.empty();
    _orderDiv.append(page[0]);
    let _str = "";

  });
}
/**
 * lists all orders for the selected buyer
 */
function listOrders()
{
  var options = {};
  options.id = $("#buyer").find(":selected").text();
  $.when($.post('/composer/admin/getSecret', options)).done(function(_mem)
  {

  });
}
/**
 * used by the listOrders() function
 * formats the orders for a buyer. Orders to be formatted are provided in the _orders array
 * output replaces the current contents of the html element identified by _target
 * @param _target - string with div id prefaced by #
 * @param _orders - array with order objects
 */
function formatOrders(_target, _orders)
{
  _target.empty();
  _str = '<table><tr><th>Order #</th><th>Items</th><th>Total</th></tr>';
  for (let each in _orders)
    {(function(_idx, _arr)
      { 

      })(each, _orders)
    }
}