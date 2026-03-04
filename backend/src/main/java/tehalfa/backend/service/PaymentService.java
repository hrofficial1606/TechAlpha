package tehalfa.backend.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import com.razorpay.*;

@Service
public class PaymentService {

    public Order createOrder(int amount)
            throws Exception {

        RazorpayClient client =
                new RazorpayClient("YOUR_KEY",
                        "YOUR_SECRET");

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100);
        options.put("currency", "INR");
        options.put("receipt", "txn_123");

        return client.orders.create(options);
    }
}