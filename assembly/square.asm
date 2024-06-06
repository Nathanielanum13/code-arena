global _start

section .data
counter dd 4    ; Define counter with initial value 4

section .text
_start:
    ; Call square function with argument 5
    mov edi, 5
    call square
    ; The result is now in eax

    ; Exit the program
    ; Using Linux system call to exit program
    ; The result of square function is left in eax as the exit status
    mov ebx, eax    ; Move result to ebx, which is used for exit status
    mov eax, 1      ; syscall number for exit
    int 0x80        ; trigger interrupt for syscall

; Function to square an integer
square:
    push ebp
    mov ebp, esp
    mov eax, [ebp+8] ; Access the first argument passed to the function
    imul eax, eax
    pop ebp
    ret
