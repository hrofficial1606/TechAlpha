package tehalfa.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.razorpay.Order;
import tehalfa.backend.service.PaymentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/payment")
public class PaymentController {

    private final PaymentService service;

    @PostMapping("/create")
    public String create(@RequestParam int amount)
            throws Exception {

        Order order = service.createOrder(amount);
        return order.toString();
    }
}