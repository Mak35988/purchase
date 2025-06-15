// Basic interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add any client-side interactivity here
    console.log('Admin panel loaded');
    
    // Example: Confirm logout
    const logoutLinks = document.querySelectorAll('a[href="/logout"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to logout?')) {
                e.preventDefault();
            }
        });
    });

    // Example: Table row hover effects
    const tableRows = document.querySelectorAll('table tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#f8f9fa';
        });
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
});

function filterTable(tableId, query) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    const queryLower = query.toLowerCase();
    let visibleCount = 0;

    // Filter rows and count visible
    for(let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;
        
        for(let cell of cells) {
            const content = cell.textContent.toLowerCase();
            if(content.includes(queryLower)) {
                found = true;
                break;
            }
        }
        
        if(found) {
            rows[i].style.display = '';
            visibleCount++;
        } else {
            rows[i].style.display = 'none';
        }
    }

    // Update serial numbers in reverse order
    let currentNumber = visibleCount;
    for(let i = 1; i < rows.length; i++) {
        if(rows[i].style.display !== 'none') {
            rows[i].cells[0].textContent = currentNumber--;
        }
    }
}

// Delete Handlers
document.addEventListener('click', function(e) {
  if(e.target.classList.contains('delete-user')) {
    const sno = e.target.dataset.id;
    if(confirm('Delete this user permanently?')) {
      fetch(`/delete_user/${sno}`, { method: 'DELETE' })
        .then(response => response.ok && window.location.reload());
    }
  }
  
  if(e.target.classList.contains('delete-txn')) {
    const sno = e.target.dataset.id;
    if(confirm('Delete this transaction permanently?')) {
      fetch(`/delete_transaction/${sno}`, { method: 'DELETE' })
        .then(response => response.ok && window.location.reload());
    }
  }
});

// Edit User Modal
document.querySelectorAll('.edit-user').forEach(btn => {
  btn.addEventListener('click', async function() {
    const sno = this.dataset.id;
    const user = await fetch(`/get_user/${sno}`).then(r => r.json());
    
    const form = document.getElementById('editUserForm');
    form.sno.value = user.sno;
    form.username.value = user.username;
    form.email.value = user.email;
    form.mobile_no.value = user.mobile_no;
    
    new bootstrap.Modal('#editUserModal').show();
  });
});

// Edit Transaction Modal
document.querySelectorAll('.edit-txn').forEach(btn => {
  btn.addEventListener('click', async function() {
    const sno = this.dataset.id;
    const txn = await fetch(`/get_transaction/${sno}`).then(r => r.json());
    
    const form = document.getElementById('editTransactionForm');
    form.sno.value = txn.sno;
    form.username.value = txn.username;
    form.transaction_id.value = txn.transaction_id;
    form.email.value = txn.email;
    form.amount.value = txn.amount;
    form.commission.value = txn.commission;
    form.status.value = txn.status;
    
    new bootstrap.Modal('#editTransactionModal').show();
  });
});

// Update User Form Submission
document.getElementById('editUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        sno: this.elements.sno.value,
        username: this.elements.username.value,
        email: this.elements.email.value,
        mobile_no: this.elements.mobile_no.value
    };

    fetch('/update_user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { 
                throw new Error(err.error || 'Unknown error'); 
            });
        }
        return response;
    })
    .then(() => window.location.reload())
    .catch(error => {
        console.error('Error:', error);
        alert(`User update failed: ${error.message}`);
    });
});

// Update Transaction Form Submission
document.getElementById('editTransactionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        sno: this.elements.sno.value,
        username: this.elements.username.value,
        transaction_id: this.elements.transaction_id.value,
        email: this.elements.email.value,
        amount: parseFloat(this.elements.amount.value),
        commission: parseFloat(this.elements.commission.value),
        status: this.elements.status.value
    };

    fetch('/update_transaction', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { 
                throw new Error(err.error || 'Unknown error'); 
            });
        }
        return response;
    })
    .then(() => window.location.reload())
    .catch(error => {
        console.error('Error:', error);
        alert(`Transaction update failed: ${error.message}`);
    });
});
